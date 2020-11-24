export const stringToDate = (dateString: string): Date => {
  try {
    return new Date(dateString);
  } catch (e) {
    console.log(
      "Something's wrong with transform string->date, returning default"
    );
    console.log(e);
    return new Date(Date.now());
  }
};
