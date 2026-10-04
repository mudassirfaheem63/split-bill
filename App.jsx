import { useState } from "react";
import "./App.css";

function App() {
  const [friends, setFriends] = useState([
    {
      name: "Fahad",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAssX2NnLOQV4Ugv5XS1QwMXtMpv0H4z2GX9oC0nFoyQSkwtW7TvUmInU&s=10",
      balance: 150,
    },
    {
      name: "Fuzail",
      imgUrl:
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/3e1f909c40ac0bb0bea323ad854f3985-1756740057893/e5655bbb-9b5d-4f01-ad34-ef787801daa5.png",
      balance: -70,
    },
    {
      name: "Bantva",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTpy30hvVM4LU8QKf0rM-TL1BmMgDq-bs9o6-xvu9cKhaDnddZXGSBuCh&s=10",
      balance: 0,
    },
  ]);

  const [componentShow, setComponentShow] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(); //fahad fuzail bantwa

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <FriendsList
          friends={friends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {!componentShow ? (
          <button onClick={() => setComponentShow(true)}>Add Friend</button>
        ) : (
          <AddFriend
            setComponentShow={setComponentShow}
            friends={friends}
            setFriends={setFriends}
          />
        )}
      </div>
      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          friends={friends}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}

export default App;

function FriendsList({ friends, setSelectedFriend, selectedFriend }) {
  return (
    <>
      {friends.map((frnd) => (
        <Friend
          frnd={frnd}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </>
  );
}

function Friend({ frnd, setSelectedFriend, selectedFriend }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={frnd.imgUrl}
          alt=""
        />
      </div>
      <div>
        <h2>{frnd.name}</h2>
        <p>
          {frnd.balance == 0
            ? "Na udhar lenay kay hain, na hi denay kay hain"
            : frnd.balance > 0
              ? `${frnd.balance} pesay humain lenay hain`
              : `${frnd.balance} pesay humain denay hain`}
        </p>
      </div>
      {selectedFriend?.name == frnd?.name ? (
        <button onClick={() => setSelectedFriend("")}>Close</button>
      ) : (
        <button onClick={() => setSelectedFriend(frnd)}>Select</button>
      )}
    </div>
  );
}

function AddFriend({ setComponentShow, friends, setFriends }) {
  const [friendName, setFriendName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  function addFriendFunction() {
    const duplicateFriends = [...friends];
    duplicateFriends.push({
      imgUrl: imgUrl,
      name: friendName,
      balance: 0,
    });
    setFriends(duplicateFriends);
  }

  return (
    <>
      <div>
        <label htmlFor="">Friend Name</label>
        <input onChange={(e) => setFriendName(e.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="">Image Url</label>
        <input onChange={(e) => setImgUrl(e.target.value)} type="text" />
      </div>
      <button onClick={addFriendFunction}>Add</button>
      <button onClick={() => setComponentShow(false)}>Close</button>
    </>
  );
}

function SplitBill({ selectedFriend, friends, setFriends }) {
  const [billPayer, setBillPayer] = useState("You");
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);

  function splitBillFunction() {
    const duplicateFriends = friends.map((frnd) => {
      // 150
      if (frnd.name == selectedFriend.name) {
        return {
          ...frnd,
          balance:
            billPayer == "You"
              ? frnd.balance + (billValue - yourExpense)
              : frnd.balance - yourExpense,
        };
      } else {
        return frnd;
      }
    });

    setFriends(duplicateFriends);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Split a Bill with {selectedFriend.name}</h1>
      <div>
        <label htmlFor="">Bill Value</label>
        <input type="text" onChange={(e) => setBillValue(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Your Expense</label>
        <input type="text" onChange={(e) => setYourExpense(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">{selectedFriend?.name} Expense</label>
        <input type="text" disabled />
      </div>
      <div>
        <label htmlFor="">Who is paying Bill??</label>
        <select name="" id="" onChange={(e) => setBillPayer(e.target.value)}>
          <option value="You">You</option>
          <option value={selectedFriend?.name}>{selectedFriend?.name}</option>
        </select>
      </div>
      <button onClick={splitBillFunction}>Split Bill</button>
    </div>
  );
}