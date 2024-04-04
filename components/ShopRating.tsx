import { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";

import { useCache } from "../contexts/Cache";
import { updateShopRating } from "../utils/api";

import { ShopRatingProps } from "./types";
import { View } from "react-native";

export default function ShopRating({
    shop_id,
    setRating,
    setVotes,
    shopPage,
}: ShopRatingProps) {
    const { cache } = useCache();
    const [userRating, setUserRating] = useState(shopPage.userVote);
    const [userHasVoted, setUserHasVoted] = useState(false);

    const handleRating = async (stars: number) => {
        setUserHasVoted(true);
        setUserRating(stars);
        if (!userHasVoted && !userRating) {
            const update = await updateShopRating(
                cache.currentCity!,
                shop_id,
                stars
            );
            setRating(update.rating);
            setVotes(update.totalRatings);
            shopPage.rating = update.rating;
            shopPage.totalRatings = update.totalRatings;
        }
        shopPage.userVote = stars;
    };

    useEffect(() => {}, [userRating]);

    return cache.user ? (
        <View pointerEvents={userHasVoted ? "none" : "auto"}>
            <StarRating
                isDisabled={true}
                enableHalfStar={false}
                maxStars={5}
                rating={userRating}
                onChange={(stars: number) => handleRating(stars)}
            />
        </View>
    ) : null;
}
