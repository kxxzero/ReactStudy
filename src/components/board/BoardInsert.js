import {Fragment, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BoardInsert() {
    const nav=useNavigate()
    const [name, setName]=useState('')
    const [subject, setSubject]=useState('')
    const [content, setContent]=useState('')
    const [pwd, setPwd]=useState('')

    // 태그를 제어 => focus , 비활성,활성화 => useRef
    const nameRef=useRef(null)
    const subjectRef=useRef(null)
    const contentRef=useRef(null)
    const pwdRef=useRef(null)

    const nameChange=(e)=>{
        setName(e.target.value)
    }

    const subjectChange=(e)=>{
        setSubject(e.target.value)
    }

    const contentChange=(e)=>{
        setContent(e.target.value)
    }

    const pwdChange=(e)=>{
        setPwd(e.target.value)
    }

    const insert=()=>{
        if(name.trim()==="") {
            nameRef.current.focus()
            return
        }
        if(subject.trim()==="") {
            subjectRef.current.focus()
            return
        }
        if(content.trim()==="") {
            contentRef.current.focus()
            return
        }
        if(pwd.trim()==="") {
            pwdRef.current.focus()
            return
        }
        axios.post('http://localhost/board/list_react', null, {
            params:{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            }
        }).then(response=>{
            if(response.data==="yes") {
                window.location.href="/board/list"
            }
            else {
                alert("게시판 추가에 실패하셨습니다")
            }
        })
    }

    return (
        <div className={"row"}>
            <h3 className={"text=center"}>글쓰기</h3>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td width={"15%"} className={"text-center"}>이름</td>
                    <td width={"85%"}>
                        <input type={"text"} value={name} ref={nameRef} size={"15"} className={"input-sm"} onChange={nameChange}/>
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>제목</td>
                    <td width={"85%"}>
                        <input type={"text"} value={subject} ref={subjectRef} size={"15"} className={"input-sm"} onChange={subjectChange}/>
                    </td>
                </tr>
                <tr>
                <td width={"15%"} className={"text-center"}>내용</td>
                    <td width={"85%"}>
                        <textarea ref={contentRef} rows={"10"} cols={"52"} onChange={contentChange}>{content}</textarea>
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>비밀번호</td>
                    <td width={"85%"} className={"text-center"}>
                        <input type={"password"} value={pwd} ref={pwdRef} size={"15"} className={"input-sm"} onChange={pwdChange}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"2"} className={"text-center"}>
                        <input type={"button"} value={"글쓰기"} className={"btn-sm btn-info"} onClick={insert}/>
                        <input type={"button"} value={"취소"} className={"btn-sm btn-warning"} onClick={() => nav(-1)}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BoardInsert