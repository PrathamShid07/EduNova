import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Rating = ({
  rating = 0,
  maxStars = 5,
  starSize = 24,
  editable = false,
  onRatingChange,
  showLabel = false,
  color = '#FFD700',
  emptyColor = '#CCCCCC'
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarPress = (selectedRating) => {
    if (editable) {
      setCurrentRating(selectedRating);
      if (onRatingChange) {
        onRatingChange(selectedRating);
      }
    }
  };

  return (
    <RatingContainer>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleStarPress(starValue)}
            disabled={!editable}
          >
            <Icon
              name={starValue <= currentRating ? 'star' : 'star-border'}
              size={starSize}
              color={starValue <= currentRating ? color : emptyColor}
            />
          </TouchableOpacity>
        );
      })}
      {showLabel && (
        <RatingText>
          {currentRating.toFixed(1)}/{maxStars}
        </RatingText>
      )}
    </RatingContainer>
  );
};

export default Rating;