## GraphQL 풀스택 웹 개발입문(Django + React/Apollo Client)
[django로 작성한 GraphQL](https://github.com/harrykim14/django_graphql)을 사용한 프론트 페이지를 구축

* React와 Apollo Client를 사용하여 쿼리와 뮤테이션의 사용법을 익힘
<image src="https://user-images.githubusercontent.com/67398691/112267145-5ef64100-8cb8-11eb-8101-6c1e79e894aa.png" width="800px"/>

(Figure 01: 전체 화면)

* [쿼리와 뮤테이션](https://github.com/harrykim14/graphql_front_react_app/blob/main/src/queries.js)을 사용하여 데이터를 가져오거나 조작해 봄

* 이름과 입사년도를 입력하고 부서 옵션을 선택하여 사원을 추가(파란색)하거나 사원 이름 오른쪽의 수정 아이콘으로 수정(라임색), 휴지통 아이콘을 클릭하여 삭제할 수 있다
* 각 항목의 세부 사항은 맨 오른쪽 아이콘을 클릭하여 세부 정보를 볼 수 있다(빨간색)

<image src="https://user-images.githubusercontent.com/67398691/112267679-29058c80-8cb9-11eb-95b7-b86cc336ba1c.png" width="800px" />

(Figure 02: 사원 항목의 CRUD를 나타낸 이미지)

* Icontains를 사용하여 부분일치된 데이터를 가져올 수 있으며, 기존 RDBMS(예: ORACLE DB, MySQL 등)에서 사용하는 AND나 OR 조건 없이 데이터를 가져올 수 있다

<image src="https://user-images.githubusercontent.com/67398691/112268074-c19c0c80-8cb9-11eb-8f51-7e3f26f73a42.png" width="800px" />

(Figure 03: 조건별 데이터와 페이지네이션 기능의 구현)
