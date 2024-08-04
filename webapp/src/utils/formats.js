export const twoSpacePadding = val => Math.floor(val).toString().padStart(2, "0");
export const formatTime = seconds => twoSpacePadding(seconds / 60) + ":" + twoSpacePadding(seconds % 60);
