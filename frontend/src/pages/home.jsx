import { CrownOutlined } from "@ant-design/icons";
import {
    Result

} from "antd";
import '../styles/home.css'

import { Button } from "@/components/ui/button"
const HomePage = () => {
    return (
        <div className="container">
            <div className="content">
                <Result
                    className="result"
                    icon={<CrownOutlined />}
                    title="TO DO LIST (React/Node.JS)"
                />
                <div className="button-container">
                    <Button>Click me</Button>
                </div>
            </div>
        </div>


    );
}

export default HomePage;