const {fn} = require("./lab");

describe("add: (a,b) a와 b 를 더해준다.", ()=>{
    test("add: (1) 은 1", ()=>{
        expect(1).toBe(1)
    })
    test("add: (3,4)는 7", ()=>{
        expect(fn.add(3,4)).toBe(7)
    })
    test("add: (10,11)은 21", ()=>{
        expect(fn.add(10,11)).not.toBe(100)
    })
})


//엄격일치 검사는 모든 내용이 다 동일하야 한다. 그냥 일치 연산과는 다름. 아래의 예에서 두번째 테스트는 
//맞았다고 나온다. 그러나 gender 값이 없다. 따라서 엄격하게 따지자면 같지 않다.
describe("person 은 name, age",()=>{
    test("name: lee, age : 30", ()=>{
        expect(fn.person("lee", 30)).toStrictEqual({name:"lee", age:30, gender:undefined});
    })
    test("name: lee, age : 30", ()=>{
        expect(fn.person("lee", 30)).toEqual({name:"lee", age:30});
    })
})

describe("null, falsy", ()=>{
    test("null", ()=>{
        expect(null).toBeNull()
    })
    test("falsy", ()=>{
        expect(fn.add(1, -1)).toBeFalsy()
    })
    test("truthy", ()=>{
        expect(fn.add("hello", "world")).toBeTruthy()
    })
})

describe("작거나 같음, 크거나 같음 등등", ()=>{
    const id = "test_string_WOW!"
    test("toBeGreaterThan", ()=>{
        expect(id.length).toBeGreaterThan(10);
    })
    test("toBeLessThan", ()=>{
        expect(id.length).toBeLessThan(40);
    })
    test("toBeGreaterThanOrEqual", ()=>{
        expect(id.length).toBeGreaterThanOrEqual(16);
    })
    //자바스크립트는 정확한 소수점 계산을 할 수 없다. 모든 프로그램 언어는 동일
    test("0.1 + 0.2 = 0.3", ()=>{
        expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3)
    })
})

//정규표현식을 모르면 쓰기 어렵다.
describe("문자열 관련한 테스트를 어떻게 할까?", ()=>{
    const strTest = "i love testing";
    test("strTest 에 i 가 있을까?", ()=>{
        expect(strTest).toMatch(/I/i)
    })
})

describe("list 에 영호가 있을까?", ()=>{
    const user = "정세한"
    const list =["정세한", "박명호", "이석원", "이상우", "박근우"];
    test("없다", ()=>{
        expect(list).toContain(user)
    })
})

//toThrow 안에 "에러" 는 던져진 에러의 메시지와 동일한지 검사한다. 그냥 비워놓게 되면 에러를 던진 것만 확인
describe("에러가 발생했냐?", ()=>{
    test("발생함!", ()=>{
        expect(()=>fn.throwErr()).toThrow("에러")
    })
})

describe("비동기 테스트", ()=>{
    test("비동기테스트 성공", (done)=>{
        function callback(name){
            expect(name).toBe("jack");
            done()
        }
        fn.getName(callback)
    })
    test("비동기 테스트 성공", async()=>{
        await expect(fn.getAge()).resolves.toBe(30)
    })
    test("비동기 테스트 실패", async()=>{
        await expect(fn.getAge()).rejects.toBe("error")
    })
})

//beforeEach 는 각 테스트마다 함수를 실행 시켜서 특정 환경을 조성함. 반면에 beforeAll 은 모든 테스트에
//적용될 수 있는 환경을 단 한번으로 조성한다. 
describe("테스트 전후 작업", ()=>{
    let user;
    beforeAll(async()=>{
        user = await fn.dbConnect();
    })
    afterAll(async()=>{
        await fn.dbDisconnect();
    })

    test("이름은 Lee", ()=>{
        expect(user.name).toEqual("Lee")
    })

    test("나이는 100", ()=>{
        expect(user.age).toBe(100);
    })

    test("성별은 male", ()=>{ //이 테스트만 시작
        expect(user.gender).toEqual("male");
    })
})

describe("before, after 실험 시작! 바깥",()=>{
    beforeAll(()=>{
        console.log("바깥 beforeAll"); //1
    })
    beforeEach(()=>{
        console.log("바깥 beforeEach"); //2, 6
    })
    afterEach(()=>{
        console.log("바깥 afterEach"); //4, 10
    })
    afterAll(()=>{
        console.log("바깥 afterAll"); //마지막 12
    })

    test("add(1,2) = 3", ()=>{
        expect(fn.add(1,2)).toStrictEqual(3); //3
    })

    describe("안쪽", ()=>{
        beforeAll(()=>{
            console.log("안 beforeAll");//5
        })
        beforeEach(()=>{
            console.log("안 beforeEach");//7
        })
        afterEach(()=>{
            console.log("안 afterEach");//9
        })
        afterAll(()=>{
            console.log("안 afterAll");//11
        })
    
        test("add(3,4) = 7", ()=>{
            expect(fn.add(3,4)).toStrictEqual(7); //8
        })
    })
})


describe("only, skip", ()=>{
    let num = 0;

    test("0 더하기 1 은 1", ()=>{
        expect(fn.add(num, 1)).toBe(1);
    })
    test("0 더하기 2 는 2", ()=>{
        expect(fn.add(num, 2)).toBe(2); //skip 을 써본다. 다른 함수의 테스트가 통과된다. 이 녀석이 문제였다.
        num = 10;
    })
    test("0 더하기 3 은 3", ()=>{
        expect(fn.add(num,3)).toBe(3); //값이 틀렸다. test.only 로 고쳐서 작업해본다. 그 결과 값이 제대로 나온다. 따라서 다른 영향 떄문이다. 
    })
})


