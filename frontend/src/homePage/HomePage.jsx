import React from 'react'
import { ProfileContainer } from './profilecontainer/profileContainer'
import { PostContainer } from './post/postContainer'
import styles from './homePage.module.css' // Import the styles object

export const HomePage = () => {
    return (
        <>
            <div className={styles.homePageContainer}> {/* Apply the className from the styles object */}
                <ProfileContainer />
                <PostContainer />
            </div>
        </>
    )
}
