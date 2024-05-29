import React, { useState } from "react";
import Modal from "react-modal";
import "../../../App.css";

// ログインのモーダル CSS設定
const modalStyle = {
  content: {
    position: "none",
    backgroundColor: "rgb(0 0 0 / 70%)",
    border: "none",
    borderRadius: "0",
    padding: "1.5rem",
    overflow: "none"
    }
};

const LoginModal = () => {

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    user_name: "",
    mail: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormErrors({}); // エラーメッセージをリセット
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの送信処理
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // handleCloseModal(); // モーダルを閉じる
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.user_name) {
      errors.user_name = "ユーザー名を入力してください";
    }
    if(!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    if(!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password ="4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password ="4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };

  return (
    <div>
      <button onClick={handleOpenModal}>ログイン</button>
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="loginFormContainer">
          <form onSubmit={handleSubmit}>
            <h3>Work & Connect ログイン</h3>
            <hr />
            <div className="loginUiForm">
              <div className="loginFormField">
                <label>ユーザー名</label>
                <input
                  type="text"
                  name="user_name"
                  value={formValues.user_name}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.user_name}</p>
              <div className="loginFormField">
                <label>メールアドレス</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <div className="loginFormField">
                <label>パスワード</label>
                <input
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.password}</p>
              <button type="submit" className="submitButton">ログイン</button>
              {Object.keys(formErrors).length === 0 && isSubmit && handleCloseModal}
              <button onClick={handleCloseModal}>閉じる</button>
              <a href="">企業の方はこちら</a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
