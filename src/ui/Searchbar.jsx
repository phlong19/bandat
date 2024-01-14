import { useState } from "react";
import { navLinks } from "../constants/navlink";

function Searchbar() {
  // use state la 1 ham san co cua react, no tra ve 2 bien
  // 1 la state
  // 2 la 1 ham de thay doi cai state day
  // khi state thay doi, toan bo component se duoc re-render, react se xem nhung cai gi da thay doi de render ra cho dung
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [counter, setCounter] = useState(0);

  const item = navLinks[0];
  const item1 = navLinks[1];

  // show1 hien tai la false -  gia tri dau vao cua state

  // muc dich ra doi cua state la de dam bao UI duoc dong bo voi du lieu
  function handleClick() {
    // ham nay co nghia la lay ra cai state hien tai va dao nguoc no, false -> true va nguoc lai
    // setShow1((s) => !s);

    // the tai sao kh set truc tiep luon? nhu la setShow(true)
    // vi
    // khi ma can thay doi gia tri cua state moi dua tren state cu
    // vi du state la int: setShow(s=>s+1)
    // co the hieu la lay ra state cu (s), tra ve state moi (s+1)
    // dam bao la luon thay doi dua tren state moi nhat

    // 1 component co the co nhieu state, nhung ma dung nhieu qua keo roi vl =))
    // 1 function cung co the handle nhieu state cung luc
    setCounter((c) => c + 4);
  }
  return (
    <div>
      {/* state co the su dung lam dieu kien de render */}
      {/* {show1 && <p className="pb-4">chi duoc render ra khi show1 = true</p>} */}

      {/* khi click se goi den func o tren kia */}
      <button onClick={handleClick} className="bg-green-400 px-4 py-3">
        click de show
      </button>

      <h1>{counter}</h1>

      {/* hoac truyen ham setState truc tiep vao onClick cung duoc */}
      <button onClick={() => setCounter(0)}>click de reset counter</button>
      {/* nhung phai de dang callback () => function */}
      {/* reset thi set luon ve 0, vi minh co can quan tam state bay gio la bao nhieu dau, quan trong la can ve 0 */}

      <div className="block lg:flex">
        <div className="">
          <button
            onClick={() => setShow1((s) => !s)}
            className="bg-green-400 px-4 py-3"
          >
            <h1 className="text-lg">{item.title}</h1>
          </button>
          {show1 && (
            <div>
              {item.child_links.map((item2) => (
                <p className="pb-4" key={item2.title}>
                  {item2.title}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* div 2 */}
        <div className="">
          <button
            onClick={() => setShow2((s) => !s)}
            className="bg-green-400 px-4 py-3"
          >
            <h1 className="text-lg">{item1.title}</h1>
          </button>
          {show2 && (
            <div>
              {item1.child_links.map((item2) => (
                <p className="pb-4" key={item2.title}>
                  {item2.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
