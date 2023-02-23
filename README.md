```js
const handleBlur = () => {
  if (columnTitle !== column.title) {
    const newCol = {
      ...column,
      title: columnTitle,
    };

    updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
      updateCol.cards = newColumn.cards;
      onUpdateColumn(updatedColumn);
    });
  }
};
```
