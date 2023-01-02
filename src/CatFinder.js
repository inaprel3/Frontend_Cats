import { useState, useEffect, useRef } from "react";
import Cat from "./Cat"
export default function CatFinder() {
    //посилання на елементи
    const tagEl = useRef();
    const textEl = useRef();
    const typeEl = useRef();
    //список доступних тегів
    const[tags, setTags] = useState([]);
    //дані для відображення зображення
    const[catData, setCatData] = useState({});
    //завантажимо список тегів тільки 1 раз
    useEffect(() => {
        async function getAndSetTags() {
            const resp = await fetch("https://cataas.com/api/tags");
            if (resp.ok) {
                const list = await resp.json();
                setTags(list);
            }
        }
        getAndSetTags();
    }, []);
    function findCat() {
        //отримаємо введені тег, текст та тип
        const tag = tagEl.current.value.toLowerCase();
        const text = textEl.current.value;
        const typeImg = typeEl.current.value;
        //якщо немає такого тегу в списку
        if (tag && !tags.find(t => t.toLowerCase() === tag)){
            alert("Enter correct tag!!!");
            return;
        }
        //інакше зберегти дані для іх подальшого відображення
        setCatData({tag, text, typeImg});
    }
    return (
        <div>
            <mark>
            <span>Category:</span>
            <br/>
            <input list="tagList" placeholder="Enter a picture tag:" ref={tagEl} />
            {/*список підказок до поля з тегом*/}
            <datalist id="tagList">
                { tags.map(tag => <option>{tag}</option>) }
            </datalist>
            <br/>
            <span>Text:</span>
            <br/>
            <input placeholder="Enter text:" ref={textEl} />
            <br/>
            <span>Type of size:</span>
            <br/>
            <input placeholder="Enter type:" ref={typeEl} />
            <br/>
            <button onClick={findCat}>Find a cat</button>
            <br/>
            {/*знайдене зображення із введеним текстом*/}
            <Cat {...catData}/>
            </mark>
        </div>
    );
}