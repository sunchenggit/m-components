<template>
  <div style="width: 400px">
    <!-- <m-menu
      :data="data"
      defaultActive="2"
      name="a"
      icon="c"
      index="b"
      children="d"
    /> -->
    <m-infinite-menu
      :data="data2"
      background-color="red"
      name="a"
      icon="c"
      index="b"
      children="d"
    />
  </div>
</template>

<script lang="ts" setup>
let data = [
  {
    a: "导航1",
    b: "1",
    c: "document",
  },
  {
    a: "导航2",
    b: "2",
    c: "document",
  },
  {
    a: "导航3",
    b: "3",
    c: "document",
    d: [
      {
        a: "导航3-1",
        b: "4",
        c: "document",
      },
    ],
  },
];
let data2 = [
  {
    a: "导航1",
    b: "1",
    c: "Document",
  },
  {
    a: "导航2",
    b: "2",
    c: "Document",
  },
  {
    a: "导航3",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "4",
        c: "Document",
        d: [
          {
            a: "导航3-1-1",
            b: "5",
            c: "Document",
            d: [
              {
                a: "导航3-1-1-1",
                b: "6",
                c: "Document",
                d: [
                  {
                    a: "导航3-1-1-1-1",
                    b: "7",
                    c: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>
