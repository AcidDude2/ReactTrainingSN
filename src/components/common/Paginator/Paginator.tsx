import { useState, FC } from "react";
import React from "react";
import styles from "./Paginator.module.css"
import cn from "classnames";


type PropsType = {
    totalItemsCount: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    pageSize: number
    portionSize?: number
}

const Paginator: FC<PropsType> = ({totalItemsCount, onPageChanged = () => {}, currentPage, pageSize, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length <= 100) {
            pages.push(i);
        }
    }

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
            {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map((p) => {
                return <span className={ cn ({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber)}
                key={p}
                    onClick={() => { onPageChanged(p) }}>{p}</span>
            })}
             {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>)
};


export default Paginator;