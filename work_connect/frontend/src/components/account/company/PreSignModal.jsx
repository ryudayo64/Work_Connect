// import React from "react";
// import Modal from "react-modal";

// class SignModal extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       showModal: false,
//     };

//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   handleOpenModal() {
//     this.setState({ showModal: true });
//   }

//   handleCloseModal() {
//     this.setState({ showModal: false });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleOpenModal}>新規登録</button>
//         <Modal isOpen={this.state.showModal} contentLabel="Example Modal">
//           <h2>新規登録</h2>
//           <form action="">
//             <input type="email" />
//             <input type="submit" value="仮登録"/>
//           </form>

//           <button onClick={this.handleCloseModal}>閉じる</button>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default SignModal;


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

const PreSignModal = () => {

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
    if(!values.mail) {
      errors.mail = "メールアドレスを入力してください";
    } else if (!regex.test(values.mail)) {
      errors.mail = "正しいメールアドレスを入力してください";
    }
    return errors;
  };

  return (
    <div>
      <button onClick={handleOpenModal}>新規登録</button>
      <Modal isOpen={showModal} contentLabel="Example Modal" style={modalStyle}>
        <div className="signUpFormContainer">
          <form onSubmit={handleSubmit}>
            <h3>Work & Connect 仮登録</h3>
            <hr />
            <div className="signUpUiForm">
              <div className="signUpFormField">
                <label>メールアドレス</label>
                <input
                  type="text"
                  name="mail"
                  value={formValues.mail}
                  onChange={handleChange}
                />
              </div>
              <p className="errorMsg">{formErrors.mail}</p>
              <button type="submit" className="submitButton">仮登録</button>
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

export default PreSignModal;
