import { CrownOutlined } from "@ant-design/icons";
import { Result

 } from "antd";
const HomePage = () =>{
    return(
        <div style={{padding: 20}}>
           <Result
                icon={<CrownOutlined/>}
                title="TO DO LIST (React/Node.JS)"
            />
        </div>
    );
}

export default HomePage;