상품 조회 프로젝트 (express, joi활용)
해당 프로젝트는 상품을 등록, 조회,수정,삭제를 할수있는 프로젝트로 json형태로 데이터를 입력받아 상품을 등록합니다
nodejs 설치필요, yarn,express 설치필요

해당 프로젝트를 사용하려면 .env파일에 mongoose에 계정정보를 입력해야합니다 
ex)MONGODB_URL = "본인계정 넣기"
   MONGODB_NAME = "본인계정 넣기"

위의 ex를 참고하여 .env를 작성해주시고 src에 있는 app.js파일을 작동해야합니다
ex) node app.js

작동시 아래의 문구가 뜨면 정상적으로 작동중입니다.
3000 포트로 서버가 열렸어요!
MongoDB 연결에 성공하였습니다.

post 사용
데이터를 집어넣고 싶으면 localhost:3000/api/products 에 json형태로 데이터를 집어넣어줘야합니다 예시는 아래를 참고하세요
{
  "productName" : "제품입니다",
  "productDescription": "편안한 착용감을 제공하는 스포츠용 신발입니다.",
  "manager": "John Doe",
  "password": "1234"
}

위 정보를 하나라도 적지 않으면 에러문구로 OOO을 입력해주세요라고 뜹니다 위 정보를 모두 입력해주셔야 합니다 데이터를 집어넣는 방법은
프론트 작업이 안돼있어 INSOMNIA라는 프로그램으로 데이터를 post로 보내며 json형태로 넣어주시면 됩니다

작성했을때 비밀번호는 잘 기억해주셔야합니다 데이터 삭제 및 수정할시 필요!

GET 사용
데이터를 조회하기 위해서는 localhost:3000/api/products 에 접속해주세요 위에서 상품을 생성하면 조회가 됩니다

GET 사용
상세조회를 위해서는 id값이 필요하며 위 조회를 하면 데이터 안에 id값이 들어갑니다 해당 id를 localhost:3000/api/products/(id입력)
에 넣어주시면 해당 데이터만 조회가 가능합니다

PATCH 사용
데이터를 수정하기 위해서는 위에서 한것처럼 localhost:3000/api/products/(id입력)에 ID를 집어넣어주시고 아래 예제에 따라 수정해주시면 됩니다
{
	"productName": "수정하기!",
	"productDescription": "수정된 상품 설명입니다.",
	"manager": "JOHN",
	"status": "SOLD_OUT",
	"password" : "PASSWORD"
}
위 정보를 입력해야 정상적으로 데이터가 변경되며 비밀번호를 잘못입력하실경우 에러메세지가 뜹니다 status는 SOLD_OUT, FOR_SALE 두 데이터를 넣어야합니다 나머지는 빈칸으로 채울시 기존데이터가 입력됩니다

DELETE 사용
삭제를 하기위해서는 삭제를 할 id를 localhost:3000/api/products/(id입력) 하여 DELETE기능으로 아래의 예처럼 채워주시면 삭제가 됩니다
{
  "password": ""
}

해당 비밀번호를 집어넣어야 삭제가 가능하며 비밀번호를 모르면 삭제가 불가능합니다
