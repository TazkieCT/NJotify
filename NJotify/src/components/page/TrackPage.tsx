import usePageStore from "../../state/page"

const TrackPage = () => {
  const changePage = usePageStore((state) => state.changePage)
  return (
    <div>
      <button onClick={(e) => {
          e.preventDefault();
          changePage("maintab");
        }}>Back Home</button>
    </div>
  )
}

export default TrackPage