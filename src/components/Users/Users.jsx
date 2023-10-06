import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/user.png"
import { NavLink } from "react-router-dom";

// props.setUsers([
//         {id: 1,
//         followed: false,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Sergey',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 2,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Volodya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 3,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Katya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 4,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Katya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 5,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Katya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }}
//     ])

// const idToFind = 13;
// const foundObject = props.users.filter(item => item.id === idToFind);
// if(foundObject!=0){
//     console.log(foundObject);
// }else{
//     console.log('petooh');
// }

// function isWantedGuest(element) {
//     const guestId = true     
//     return element.followed === guestId
//   }

//   console.log(props.users.findIndex(isWantedGuest))

//     let users2 = [            
//         {id: 4,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Katya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 5,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Katya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 6,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Vasya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }},
//         {id: 7,
//         followed: true,
//         photoUrl: 'https://i.ytimg.com/vi/nvCeuwYCX8Q/hq720.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLCTsGuM7TAEomZK2ZNpiijGvKbABw',
//         fullName: 'Petya',
//         status: 'No pain no gain',
//         location: { cityName: 'Moskva', countryName: 'Russia' }}
//     ]

// let newUsers = props.users;

//     function mergeArraysWithoutDuplicates(newUsers, users2) {
//         const mergedArray = [...new Set([...newUsers, ...users2])];
//         return mergedArray;
//       }

//       const mergedArray = mergeArraysWithoutDuplicates(newUsers, users2);

//       console.log(mergedArray);

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length <= 30) {
            pages.push(i);
        }
    }

    return <div>
        <div class={styles.pageList}>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={"./../profile/" + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => { props.unfollow(u.id) }
                                }>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => { props.follow(u.id) }
                                }>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.cityName'}</div>
                        <div>{'u.location.countryName'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;