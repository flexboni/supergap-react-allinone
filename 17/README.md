# hook flow 이해하기 2

## useEffect

render가 끝난 뒤 호출 된다.

update 되는 경우 useEffect clean up이 호출 되고 useEffect가 다시 호출 된다.

## 정리

부모와 자식 관계에서 useEffect 를 호출하는 경우 life cycle 을 잘 생각해서 코드를 작성해야 한다.
