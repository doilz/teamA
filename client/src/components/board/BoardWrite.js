import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"


function BoardWrite() {
  let navigate = useNavigate(); 
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); // submit 이벤트 발생시 refresh 방지
    console.log({text})
    // const {bidx, buserid, btitle, bcontent, regdate, modidate, bhit, blikeuser} =text;
    axios.post("http://localhost:5000/board/write",{text})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
        console.log(error.response.data)
        alert(error.response.data.error)
    })
    setText('');
    // navigate("/board/list");

    
  }
  return (
    <>
      <h1>글 쓰기</h1>
      <form onSubmit={onSubmit}>
        <table border="1">
          <tbody>
            <tr>
              <td>작성자</td>
              <td><input name="buserid" />누구야</td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input name="btitle" />뭐야</td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <input 
                  value={text}
                  type='text'
                  name='bcontent'
                  onChange={onChange}
                  placeholder="content please"
                  required="required"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">글추가쓰</button>
      </form>
    </>
  )
}

export default BoardWrite;