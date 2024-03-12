/*
    Hooks : 상태(데이터) 관리 => 함수(function) 단위
        = state : 변경이 가능한 변수 => vue에서는 'data(){}'로 표현
            - useState() : 프로그램 종료 시까지 유지
        = props : 변경이 불가능한 변수(이미 존재하는 변수)
            - 함수(function)의 매개변수
                예) function Detail(props)

        *** 생명주기 함수
       예1) class App extends Component {
                constructor() {
                    => state 변수 지정
                    => 이벤트 등록
                }
                componentWillMount(){}
                *** componentDidMount(){} = mounted() = window.onload
                componentWillUpdate(){}
                *** componentDidUpdate(){} => state가 변경이 될 때
            }
        예2) function App() {
                state => useState
                componentDidMount(){} => useEffect()
                componentDidUpdate() => 사용 가능
            }


        = useEffect(()=>{
            처리 내용 => 서버 연결 => axios, fetch
                                   =====> 동기 / 비동기
                                   aync axios
          },[]) => 한 번만 수행

        예) useEffect(()=>{
                처리 내용 => 서버 연결 => axios, fetch
                                       =====> 동기 / 비동기
                                       aync axios
            },[page]) => 'page'가 변경될 때 재호출


        = 최적화
            - useMemo
            - useCallBack
        = 공통모듈
            - useContext
        = URL을 이용해서 값을 받는 경우
            - useParams
                => useReducer => MVC (Redux ***)
                    input의 데이터를 참조 : useRef

    --------------------------------------------------

    1. 변수 설정
    2. 데이터 초기화
    3. return에 있는 html을 index.html로 수행
    4. 데이터 변경 시 return을 실행

    *** 압축 WebPack 사용
        => <script defer src="/static/js/bundle.js"></script>

 */

import {Fragment,useState,useEffect} from "react";
import axios from "axios";
/* global kakao */

function FoodList(){
    const [curpage, setCurpage]=useState(1)
    const [totalpage, setTotalpage]=useState(0)
    const [startPage, setStartPage]=useState(0)
    const [endPage, setEndPage]=useState(0)
    const [foodList,setFoodList]=useState([])
    const [foodDetail,setFoodDetail]=useState({})
    const [open,setOpen]=useState(false)
    
    // 값을 서버로부터 받아옴
    useEffect(() => {
        axios.get('http://localhost/food/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            setFoodList(response.data.list)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        })
    }, [curpage]);

    useEffect(()=>{
        const script=document.createElement("script")
        // <script src=""></script>
        script.async=true
        script.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=666e34535b94b665d2f33b3ee94a689a&libraries=services"
        document.head.appendChild(script)
        /*
            <head>
                <script src=""></script>
            </head>
         */
        script.onload=()=>{
            kakao.maps.load(()=>{
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(foodDetail.address, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+foodDetail.name+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        }
    },[foodDetail])

    // 페이지
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prevHandler=()=>{
        setCurpage(startPage-1)
    }
    const nextHandler=()=>{
        setCurpage(endPage+1)
    }
    const onFoodDetail=(vo)=>{
        setOpen(true)
        setFoodDetail(vo)
    }

    let html=foodList.map((vo) =>
        <div className="col-md-4">
            <div className="thumbnail">
                <img src={'http://www.menupan.com' + vo.poster} style={{"width": "100%"}} onClick={()=>onFoodDetail(vo)}/>
                <div className="caption">
                    <p>{vo.name}</p>
                </div>
            </div>
        </div>
    )
    let row=[]

    if(startPage>1) {
        row.push(<li><a href={"#"} onClick={()=>prevHandler()}>&laquo;</a></li>)

    }
    for(let i=startPage;i<=endPage;i++) {
        if(curpage===i) {
            row.push(<li className={"active"}><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
        else {
            row.push(<li><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
    }
    if(endPage<totalpage) {
        row.push(<li><a href={"#"} onClick={()=>nextHandler()}>&raquo;</a></li>)
    }

    return (
        <Fragment>
            <div className={"row"}>
                <div className={"col-sm-8"}>
                    {html}
                    <div style={{"height":"20px"}}></div>
                    <div className={"text-center"}>
                        <ul className={"pagination"}>
                            {row}
                        </ul>

                    </div>
                </div>
                <div className={"col-sm-4"}>
                    {open ? <Detail vo={foodDetail}/> : null}
                    <div style={{"height": "10px"}}></div>
                    <Maps/>
                </div>
            </div>
        </Fragment>
    )
}

function Maps() {
    return (
        <div id="map" style={{"width": "100%", "height": "350px"}}></div>
    )
}

// state => useState , props => property => 태그의 속성을 이용해서 값을 가지고 온다
// 메인 => function ==> 여러개의  function을 사용할 수 있다
// 연결시에 반드시 props를 이용한다
function Detail(props) {
    return (
        <table className={"table"}>
            <tbody>
            <tr>
                <td colSpan={"2"} className={"text-center"}>
                    <img src={"http://www.menupan.com" + props.vo.poster} style={{"width": "100%"}}/>
                </td>
            </tr>
            <tr>
                <td colSpan={"2"}>
                    <h3>{props.vo.name}&nbsp;<span style={{"color": "orange"}}>{props.score}</span></h3>
                </td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>주소</td>
                <td width={"75%"}>{props.vo.address}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>전화</td>
                <td width={"75%"}>{props.vo.phone}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>음식종류</td>
                <td width={"75%"}>{props.vo.type}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>가격대</td>
                <td width={"75%"}>{props.vo.price}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>영업시간</td>
                <td width={"75%"}>{props.vo.time}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>좌석</td>
                <td width={"75%"}>{props.vo.seat}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default FoodList