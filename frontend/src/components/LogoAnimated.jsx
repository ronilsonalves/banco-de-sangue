import React from "react";
import Lottie from "lottie-react"
import heartAnimated from "../images/heart.json"

export default function LogoAnimated() {
    return(
        <div className="flex items-center flex-row">
              <a href="/">
                <span className="sr-only">Blood Donation</span>
                <div id="heart-animated">
                    <Lottie animationData={heartAnimated} loop={false} className="h-10 w-auto"/>
                </div>
              </a>
        </div>
    )
}