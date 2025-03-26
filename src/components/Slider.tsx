const Slider = ({value = 0, backgroundColor = 'darkblue', foregroundColor = 'lightblue'}) =>{
    console.log(value)
return(
    <div style={{
        backgroundColor: backgroundColor,
        height: '10px',
        width: '150px',
        borderRadius: "5px",
        overflow: 'hidden',
        padding: '0px',
        border: '1px solid black'
    }}><div style={{
        backgroundColor: foregroundColor,
        height:'inherit',
        width: `${(150*Number(value))/255}px`
    }}></div></div>
)
}
export default Slider