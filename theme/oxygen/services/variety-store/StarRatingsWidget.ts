import { app } from "../../interfaces/app";

export interface StarRatingsWidget {
    __ratingSummary:(widgetId: string, totalReviews: number, averageScore: number)=>void
    __ratingsFull:(widgetId: string, totalReviews: number, averageScore: number, options: {displayCount: boolean}) => void
}

app.service<StarRatingsWidget>('StarRatingsWidget',()=>{
    const fullStarIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:#E91E63;height:19px;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>'
    const halfStarIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:#E91E63;height:19px;"><path d="M5.025 20.775A.998.998 0 0 0 6 22a1 1 0 0 0 .555-.168L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107-1.491 6.452zM12 5.429l2.042 4.521.588.047h.001l3.972.315-3.271 2.944-.001.002-.463.416.171.597v.003l1.253 4.385L12 15.798V5.429z"></path></svg>'
    const emptyStarIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:#E91E63;height:19px;"><path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"></path></svg>'
    class __Service {
        __ratingSummary(widgetId: string, totalReviews: number, averageScore: number){
            const grammar = (totalReviews === 1) ? 'Review' : 'Reviews'
            document.getElementById(widgetId).innerHTML = `${fullStarIcon} <span>${totalReviews} ${grammar} (${averageScore})</span>`
        }
        __ratingsFull(widgetId: string, totalReviews: number, averageScore: number, options: {displayCount: boolean}){
            let widgetHtml = '<div style="display:flex;">'
            for (let i = 1; i <= 5; i++) {
                if (averageScore >= i) {
                    widgetHtml += fullStarIcon
                } else if (averageScore + 0.5 >= i) {
                    widgetHtml += halfStarIcon
                } else {
                    widgetHtml += emptyStarIcon
                }
            }
            if (options.displayCount) {
                const grammar = (totalReviews === 1) ? 'Review' : 'Reviews'
                widgetHtml += ` <span style="display:inline-block;margin-top:2px;margin-left:5px;">${totalReviews} ${grammar}</span>`
            }
            document.getElementById(widgetId).innerHTML = `${widgetHtml}</div>`
        }
    }
    return new __Service
})