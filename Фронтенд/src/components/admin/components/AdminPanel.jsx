import React, {useState} from 'react';
import Header from "../../mainPage/components/navbar/Header";
import Footer from "../../mainPage/components/footer/Footer";
import '../styles/AdminPanel.css'

const AdminPanel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
            setFile(selectedFile);
        } else {
            alert('Please upload a file with .xlsx extension.');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            console.log(file)
        } else {
            alert('No file selected or invalid file type.');
        }
    };

    return (
        <div className='admin'>
            <Header />
                <div className="container">
                    <div className="admin__content">
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept=".xlsx" onChange={handleFileChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;