import { useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import { useCache } from "../contexts/Cache";
import { updateShopRating } from "../utils/api";
import { ShopRatingProps } from "./types";


export default function ShopRating({ shop_id, setRating, setVotes, shopPage }:ShopRatingProps) {
    const { cache } = useCache();
    const [userRating, setUserRating] = useState(shopPage.userVote);
    const [userHasVoted, setUserHasVoted] = useState(false);

    const handleRating = async (stars: number) => {
        setUserRating(stars);
        if (!userHasVoted && !userRating) {
            const update = await updateShopRating(
                cache.currentCity,
                shop_id,
                stars
            );
            setRating(update.rating);
            setVotes(update.totalRatings);
            setUserHasVoted(true);
            shopPage.rating = update.rating;
            shopPage.totalRatings = update.totalRatings;
        }
        shopPage.userVote = stars;
    };

    useEffect(() => {}, [userRating]);

    return cache.user ? (
        <StarRating
            disabled={false}
            maxStars={5}
            rating={userRating}
            selectedStar={(stars: number) => handleRating(stars)}
        />
    ) : null;
}
