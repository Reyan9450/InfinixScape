import { SlUserFollow } from "react-icons/sl";
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from "react-icons/fa";
import styles from './infiniteWindow.module.css'; // Import styles correctly
import { ScrollView } from "./ScrollView/ScrollView";

export const InfiniteWindow = () => {
    return (
        <div className={styles.infiniteWindow}> {/* Use styles object to apply CSS class */}
            
            <div className={styles.section1}> {/* Apply styles correctly */}
                <SlUserFollow />
                
                {/* Display the icon here */}

            </div>

            <div className={styles.section2}>

                {/* Add content for section2 */}
                <ScrollView />
                

            </div>

            <div className={styles.section3}>
                
                <FaThumbsUp />
                <FaThumbsDown />
                <FaShareAlt />

                {/* Add content for section3 */}
            </div>
        </div>
    );
};
