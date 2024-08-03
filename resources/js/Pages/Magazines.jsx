import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MainMagazines from "@/Components/MainMagazines";

const Magazines = ({ title, categories, magazines }) => {
    return (
        <>
            <div className="fixed h-full w-full top-0 left-0 z-40" id="overlay"></div>
            <Header
                title={title}
                categories={categories}
            />
            <MainMagazines
                magazines={magazines}
            />
            <Footer />
        </>
    );
}

export default Magazines;
