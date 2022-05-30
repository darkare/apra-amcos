
const ColouredLine = ({ colour } : any ) => (
    <hr
        style={{
            color: colour,
            backgroundColor: colour,
            height: 5
        }}
    />
);

export default ColouredLine;