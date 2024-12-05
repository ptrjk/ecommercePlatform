import { NavBar } from '../components/NavBar';
import { Header } from '../components/Header';
import CategoryItem from '../components/CategoryItem';

export default function HomePage() {

    return <>
        <NavBar></NavBar>
        <div className='main-content'>
            <Header></Header>
            <section style={{ width: "100%", marginTop: "150px" }}>
                <h3 style={{ marginLeft: "60px" }}>Discover by Room</h3>
                <div className="grid-container">
                    <CategoryItem categoryClass={"item1"} title={"Show all products"} destination={"products/all"}></CategoryItem>
                    <CategoryItem categoryClass={"item2"} title={"Upgrade Your Living Room"} destination={"products/living-room"}></CategoryItem>
                    <CategoryItem categoryClass={"item3"} title={"Kitchen essentials"} destination={"products/kitchen"}></CategoryItem>
                    <CategoryItem categoryClass={"item4"} title={"Bathroom"} destination={"products/bathroom"}></CategoryItem>
                    <CategoryItem categoryClass={"item5"} title={"Bedroom"} destination={"products/bedroom"}></CategoryItem>
                </div>
            </section>
        </div >
    </>
}