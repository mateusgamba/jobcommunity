const express = require("express");
const slugify = require("slugify");
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    if (profile.experience.length) {
      profile.experience = _.orderBy(
        profile.experience,
        ["to", "from"],
        ["desc", "desc"]
      );
    }

    if (profile.education.length) {
      profile.education = _.orderBy(
        profile.education,
        ["to", "from"],
        ["desc", "desc"]
      );
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Current professional status is required").not().isEmpty(),
      check("location", "Country and city is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const message =
      "Please check the fields and fix any errors before continuing";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message,
      });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      whatsapp,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    profileFields.company = company;
    profileFields.website = website;
    profileFields.location = location;
    profileFields.bio = bio;
    profileFields.status = status;
    profileFields.githubusername = githubusername;
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
    profileFields.whatsapp = whatsapp;

    // Build social object
    profileFields.social = {
      youtube: youtube,
      twitter: twitter,
      facebook: facebook,
      linkedin: linkedin,
      instagram: instagram,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Generate slug
      const user = await User.findOne({ _id: req.user.id });
      profileFields.handle = slugify(user.name, {
        lower: true,
        strict: true,
      });

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    let profilesFormated = new Array();

    if (profiles.length) {
      profiles.forEach((profile) => {
        profilesFormated.push({
          _id: profile._id,
          skills: profile.skills,
          name: profile.user.name.toLowerCase(),
          user: profile.user,
          company: profile.company,
          location: profile.location,
          bio: profile.bio,
          status: profile.status,
          handle: profile.handle,
        });
      });

      profilesFormated = _.orderBy(profilesFormated, ["name"], ["asc"]);
    }
    res.json(profilesFormated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:handle", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar", "email"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    if (profile.experience.length) {
      profile.experience = _.orderBy(
        profile.experience,
        ["to", "from"],
        ["desc", "desc"]
      );
    }

    if (profile.education.length) {
      profile.education = _.orderBy(
        profile.education,
        ["to", "from"],
        ["desc", "desc"]
      );
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "Start date is required").not().isEmpty(),
      check("to").custom((value, { req }) => {
        if (value !== "") {
          if (Date.parse(req.body.from) > Date.parse(value)) {
            throw new Error(
              "Your End Date cannot be earlier than your Start Date"
            );
          }
        } else {
          if (!req.body.current) {
            throw new Error("End date or Current Job is required");
          }
        }
        return true;
      }),
    ],
  ],
  async (req, res) => {
    const message =
      "Please check the fields and fix any errors before continuing";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message,
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "Start date is required").not().isEmpty(),
      check("to").custom((value, { req }) => {
        if (value !== "") {
          if (Date.parse(req.body.from) > Date.parse(value)) {
            throw new Error(
              "Your End Date cannot be earlier than your Start Date"
            );
          }
        } else {
          if (!req.body.current) {
            throw new Error("End date or Current School is required");
          }
        }
        return true;
      }),
    ],
  ],
  async (req, res) => {
    const message =
      "Please check the fields and fix any errors before continuing";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message,
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
