import { useEffect, useState }	from "react";
export default function Cat ({ tag, text, typeImg}) {
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        const getCat = async () => {
            //формуємо параметри запиту
            const tagParam = tag ? "/"+tag : "";
            const textParam = text ? "/s/"+encodeURIComponent(text) : "";
            const typeParam = typeImg ? "&type="+encodeURIComponent(typeImg) : "";
            //отримаємо відповідь від серверу
            const resp = await fetch(`https://cataas.com/c${tagParam}${textParam}?json=true${typeParam}`)
            //якщо погана відповідь
            if (!resp.ok) {
                alert("Error happened :(");
                return;
            }
            //інакше дістанемо і використаємо дані з відповіді
            const data = await resp.json();
            setImg(data.url);
            setTags(data.tags);
        }
        //приберемо поточне зображення
        setImg(null);
        //знайдемо і відобразимо наступне
        getCat();
    //оновлюватимо зображення щоразу, коли тег або текст змінюється
    }, [tag, text, typeImg]);
    //нічого відображатись не буде, якщо немає зображення
    if (!img) return;
    return (
        <div>
            <img src={"https://cataas.com" + img} alt = {tags.join(", ")} />
            <br/>
            <mark>Tags: { tags.length ? tags.map(s => "#"+s).join(", "):"No tags"}</mark>
        </div>
    );
}