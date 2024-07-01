import React from "react";

const date = new Date()
const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


export default function App() {

    const [pages, setPages] = React.useState([]);
    const [count, useCount] = React.useState(1)
    const [read, setRead] = React.useState(0)
    const [maxPages, setMaxPages] = React.useState(5)
    React.useEffect(
        function run() {
        fetch(`https://api.alquran.cloud/v1/page/${count}/quran-uthmani`)
            .then(res => res.json())
            .then(rand => setPages(rand.data.ayahs))
        console.log("pla")
        }, [count])
    
    function PlusPages () {
        useCount((prev) => {
            return prev += 1
        })

        setRead(prev => prev + 1)
    }

    function MinuePages () {
        useCount((prev) => {
            return prev -= 1
        })

        setRead(prev => prev - 1)
    }
    console.log(pages)
    const aya = pages.map((ele) => <Ayah numberInSurah={ele.numberInSurah} text={ele.text} key={`${ele.surah.name} ${ele.numberInSurah}`} />)

    // const 

    return (
        <>
            <nav>
            <h2>الورد اليومي</h2>
                <h3>{formattedDate}</h3>
                <div className="target">
                    <h3>عدد الصفحات  :</h3>
                    <input type="number" min={5} value={maxPages} onChange={(e) => +e.target.value < 5 ? 5 : setMaxPages(+e.target.value)}/>
                </div>
                {/* <select>

                </select> */}
            </nav>
            <div className="first-main">
                <div className="page">
                    {
                        read >= maxPages
                            ? <div className="progress">
                                <p className=""> تم قراءة ورد اليوم  👍</p>
                                </div>
                            :
                            <div className="progress">
                                <p> الصفحه {count}</p>
                                <p>قرأت {read}</p>
                            </div>
                    }
                    
                    <div className="main">
                        <div className="surah">
                            {aya}
                        </div>
                    </div>
                </div>
                <Buttons read={read} maxPages={maxPages} PlusPages={PlusPages} MinuePages={MinuePages} />
            </div>
        </>
    )
}

function Ayah(probs) {
    return (
        <div>
            {probs.text} <i>{probs.numberInSurah}</i>
        </div>
    )
}

function Buttons(probs) {

    if (probs.read >= probs.maxPages) {
        return (
            <div className="buttons">
                <p className="done">عد لنا في الغد 😁🌹</p>
            </div>
        )
    }

    return (
        <div className={probs.read > 0 ? "buttons space" : "buttons"}>
            {probs.read > 0 && <button onClick={probs.MinuePages}>السابق</button>}
            <button onClick={probs.PlusPages}>التالي</button>
            {/* {probs.read >= probs.maxPages ? "" : <button onClick={probs.PlusPages}>التالي</button>} */}
        </div>
    )
}