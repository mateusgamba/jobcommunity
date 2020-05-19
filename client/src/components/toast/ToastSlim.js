import React, { Component } from "react";
import { Toast, ToastHeader } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setToastOut } from "../../actions/toastSlim";
import "../../assets/sass/toast.scss";

class ToastSlim extends Component {
  onClose(id, msg) {
    this.props.setToastOut(id, msg);
  }

  render() {
    const alerts = this.props.toast;
    return (
      alerts.length > 0 && (
        <div className="react-alert-toast">
          {alerts.map(alert => {
            return (
              <Toast
                key={alert.id}
                className={`${alert.effect} ${alert.display}`}
              >
                <ToastHeader
                  toggle={this.onClose.bind(this, alert.id, alert.msg)}
                  className={alert.display}
                >
                  {alert.message}
                </ToastHeader>
              </Toast>
            );
          })}
        </div>
      )
    );
  }
}

ToastSlim.propTypes = {
  toast: PropTypes.array.isRequired,
  setToastOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  toast: state.toast
});

export default connect(mapStateToProps, { setToastOut })(ToastSlim);
