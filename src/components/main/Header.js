// jsx = javascript + xml => 태그 생성 시 문자열 결합을 하지 않음
// DOM : 메모리 2개 생성
//      가상 DOM : 사용자 정의를 저장하는 메모리
//      실제 DOM : 실제 브라우저에서 읽어가는 메모리
//      => 가상 DOM과 실제 DOM을 비교해서 변경된 부분만 수정 => 속도 빠름 => 화면이 깜빡이는 현상 없음
// 장점 : 컴포넌트를 통해 분산 작업하기 때문에 개발 생산성이 높음
//       구조가 간단함
//       재사용성이 좋음
// 공통 모듈 구현
// class 기반 : 멤버 변수 사용 시 삭제 전까지 변수 초기화 없음 => 16.8 이후 버전에서는 사용하지 않음
// function 기반 : 지역 변수 사용 시 변수 초기화 있음 => Hooks useState : 지역 변수지만 다른 작업 후 돌아와도 변수 값을 유지가 가능하도록 함

import {Fragment} from "react";
import {Link} from "react-router-dom";

// 1번 방식) 함수 호출 방식
function Header(){
    return (
        // html이 위치하는 자리
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>Router 연습</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><Link to={"/"}>Home</Link></li>
                <li className="dropdown">
                    <Link className="dropdown-toggle" data-toggle="dropdown" to={"/"}>스토어<span className="caret"></span></Link>
                    <ul className="dropdown-menu">
                        <li><Link to={"/goods/all"}>전체 상품</Link></li>
                        <li><Link to={"/goods/best"}>베스트 상품</Link></li>
                        <li><Link to={"/goods/special"}>특가 상품</Link></li>
                        <li><Link to={"/goods/new"}>신상품</Link></li>
                    </ul>
                </li>

                <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">맛집<span
                    className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li><Link to={"/food/list"}>맛집 목록</Link></li>
                        <li><Link to={"/food/find"}>맛집 검색</Link></li>
                    </ul>
                </li>
                <li><Link to={"/news/list"}>맛집 뉴스</Link></li>
                <li><Link to={"/board/list"}>커뮤니티</Link></li>
            </ul>
        </div>
    </nav>
    )
}

// 반드시 export를 입력해야 함수 호출 가능
export default Header


// 2번 방식) 익명 방식 => 권장 방식
/*export const Header = () => {
    return (
        <div></div>
    )
}*/


/*
    문법
    1. function / class 명칭을 모두 대문자로 함 (html은 소문자로 함)
       예) function Detail => <Detail>
          function Header => <Header>

    2. html이 xml 형식으로 제작
        - 여는 태그와 닫는 태그 동일
        - 루트 태그 존재
        - style={{}}
        - <input/>, <img/>
 */