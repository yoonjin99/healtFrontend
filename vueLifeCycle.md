:green_book: Vue 생명 주기 <br>
======================
Vue 컴포넌트의 생성 후 소멸될 때까지의 주기.

생명주기가 지켜져야 하는 이유.
-----------------------------
:small_orange_diamond: 상태 관리 및 초기화 : 컴포넌트의 생명 주기를 사용하면 컴포넌트의 상태를 초기화 하거나 필요한 데이터를 불러오는 등 초기 설정 가능.<br>
:small_orange_diamond: 리소스 관리 : 리소르 관리를 통해 불필요한 리소스 누수를 방지하고 성능을 개선할 수 있음.<br>
:small_orange_diamond: 이벤트 처리 : 컴포넌트 생명 주기는 이벤트 처리를 위한 훅(hook)를 제공함. ex) created()<br>
:small_orange_diamond: 동적 업데이트 : 컴포넌트가 업데이트 될 때 어떤 로직을 실행할지 제어할 수 있음.<br>
:small_orange_diamond: 디버깅 및 추적<br>
:small_orange_diamond: 외부 라이브러리 통합<br>

Vue 생명 주기 단계
----------------------------
1. Creation(생성) 단계<br>
   beforeCreate()와 create()가 존재.<br>
   beforeCreate() 는 라이프사이클 중에서 가장 맨 처음 실행됨.<br>
   아직 컴포넌트가 DOM에 추가되기 전이므로 DOM에 접근하게 되면 에러 발생.<br>
   created()는 data() 변수와 events 메서드가 활성화되어 접근 가능.<br>

   beforeCreate() -> data() -> create() 순으로 실행.<br>
   create() 에서도 템플릿과 가상 DOM 에는 접근 할 수 없음.<br>
   
2. Mounting(장착) 단계
   beforeMount() 와 mounted() 가 존재.<br>
   beforeMount() 는 <template> 태그가 실행된 후 실행.<br>
   첫 렌더링이 일어나기 직전에 실행.<br>

   초기 렌더링 직전에 DOM을 변경하고자 한다면 이 생명주기를 활용하면 됨.<br>
   하지만 컴포넌트 초기에 설정해야 할 데이터들은 created 단계에서 해야함.<br>

   mounted() 는 템플릿과 렌더링 된 DOM에 접근할 수 있는 단계.<br>
   beforeMount() -> <template>{{ beforMountTest() }}</template> -> mounted()<br>

   **mounted 단계에서 주의할 점.**<br>
   __부모 자식 관계에서 컴포넌트를 렌더링 할 때 자식 컴포넌트가 부모 컴포넌트보다 먼저 Mounted가 실행됨.__<br>

3. Updaing(수정) 단계
   beforeUpdate() 와 updated()가 존재.<br>
   beforeUpdate()는 컴포넌트의 데이터가 변하여 업데이트 시작될 때 실행됨.<br>
   DOM이 재 렌더링 되고 패치되기 직전 실행. 새 상태의 데이터를 얻을 수 있음.<br>

   update()는 컴포넌트의 데이터가 변하여 재 렌더링이 일어난 후 실행.<br>
   DOM이 업데이트 완료된 상태이며 연산과 기능을 할 수 있음.<br>
   
6. Destruction(소멸) 단계
   beforeDestory()와 destoryed()가 존재.<br>
   beforeDestory()는 소멸(뷰 컴포넌트 제거)되기 직전에 호출.<br>

   destoryed()는 소멸된 후에 호출.<br>
   Vue의 모든 디텍티브 바인딩 해제되고 모든 이벤트 리스너가 제거되며 모든 하위 Vue 컴포넌트도 삭제됨.<br>

생명 주기 표<br>
--------------------------
![lifecycle d3fe54ca](https://github.com/yoonjin99/healthFrontend/assets/60498414/b8bbb896-797c-4d0b-a105-cd1d64a80b59)
<br>
<br>
참고URL<br>
https://ko.vuejs.org/guide/essentials/lifecycle.html <br>
https://any-ting.tistory.com/42
