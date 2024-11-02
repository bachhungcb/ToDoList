import { CrownOutlined } from "@ant-design/icons";
import { Result

 } from "antd";

 import {Button} from "@/components/ui/button"
const HomePage = () =>{
    return(
        <div style={{padding: 20}}>
           <Result
                icon={<CrownOutlined/>}
                title="TO DO LIST (React/Node.JS)"
            />
                <div>
                    <Button>Click me</Button>
                </div>

        </div>
    );
}

export default HomePage;