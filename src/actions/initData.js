export const initData = {
  columnsOrder: ["column-1", "column-2", "column-3", "column-4"],

  columns: [
    {
      id: "column-1",
      title: "To do column 1",
      cardOrder: ["card-1", "card-2"],
      cards: [
        { id: "card-1", columnId: "column-1", title: "Card - 01, Column - 01" },
        { id: "card-2", columnId: "column-1", title: "Card - 02, Column - 01" },
      ],
    },

    {
      id: "column-2",
      title: "To do column 2",
      cardOrder: ["card-3", "card-4", "card-5", "card-6"],
      cards: [
        { id: "card-3", columnId: "column-2", title: "Card - 03, Column - 02" },
        { id: "card-4", columnId: "column-2", title: "Card - 04, Column - 02" },
        { id: "card-5", columnId: "column-2", title: "Card - 05, Column - 02" },
        { id: "card-6", columnId: "column-2", title: "Card - 06, Column - 02" },
      ],
    },

    {
      id: "column-3",
      title: "To do column 3",
      cardOrder: [
        "card-7",
        "card-8",
        "card-9",
        "card-10",
        "card-11",
        "card-12",
      ],
      cards: [
        { id: "card-7", columnId: "column-3", title: "Card - 07, Column - 02" },
        { id: "card-8", columnId: "column-3", title: "Card - 08, Column - 02" },
        { id: "card-9", columnId: "column-3", title: "Card - 09, Column - 02" },
        {
          id: "card-10",
          columnId: "column-3",
          title: "Card - 10, Column - 03",
        },
        {
          id: "card-11",
          columnId: "column-3",
          title: "Card - 11, Column - 03",
        },
        {
          id: "card-12",
          columnId: "column-3",
          title: "Card - 12, Column - 03",
        },
      ],
    },

    {
      id: "column-4",
      title: "To do column 4",
      cardOrder: [
        "card-13",
        "card-14",
        "card-15",
        "card-16",
        "card-17",
        "card-18",
        "card-19",
      ],
      cards: [
        {
          id: "card-13",
          columnId: "column-4",
          title: "Card - 13, Column - 04",
        },
        {
          id: "card-14",
          columnId: "column-4",
          title: "Card - 14, Column - 04",
        },
        {
          id: "card-15",
          columnId: "column-4",
          title: "Card - 15, Column - 04",
        },
        {
          id: "card-16",
          columnId: "column-4",
          title: "Card - 16, Column - 04",
        },
        {
          id: "card-17",
          columnId: "column-4",
          title: "Card - 17, Column - 04",
        },
        {
          id: "card-18",
          columnId: "column-4",
          title: "Card - 18, Column - 04",
        },
        {
          id: "card-19",
          columnId: "column-4",
          title: "Card - 19, Column - 04",
        },
      ],
    },
  ],
};
