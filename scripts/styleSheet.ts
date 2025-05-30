export default {
    form:{
        input: `w-full h-10 py-2 px-3 text-black bg-white border border-gray-300 dark:border-[var(--dm-line)] placeholder:font-normal placeholder:text-md outline-none transition-all duration-200  focus:ring-2 focus:ring-gray-200 focus:border-black focus:bg-white focus:placeholder:text-black  hover:placeholder:text-black dark:bg-[var(--dark)] dark:placeholder:text-[var(--gray)] dark:text-white dark:hover:placeholder:text-[var(--gray)] dark:hover:border-[var(--dark-soft)] dark:focus:ring-[var(--dark)] dark:focus:bg-[var(--dark)] dark:focus:placeholder:text-[var(--gray)] dark:focus:border-[var(--dm-line)]`,
        icon: `absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-lg group-hover:text-black dark:group-hover:text-[var(--gray)]`,
        wrapper: `w-full md:w-[450px] m-auto flex flex-col p-4 md:p-8 rounded dark:bg-[var(--dark)]`,
        link: `text-md text-gray-600 font-medium dark:text-white`,
        linkWrap: `flex items-center gap-2`,
        label: 'text-sm text-gray-600 font-bold dark:text-white',
        htext: `text-md text-gray-600 dark:text-[var(--gray)]`
    },
    btn:{
       baseStyle: `h-10 group font-medium dark:text-[var(--text-dark)] relative cursor-pointer inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:opacity-90 gap-3 px-3.5`,
       variants: {
          primary: `bg-black dark:bg-[#bee0ef] text-white hover:opacity-90 dark:text-black`,
          secondary: `bg-white border border-gray-300 hover:bg-gray-200 hover:border-gray-200 dark:bg-[var(--dark)] dark:border-[var(--dm-line)] dark:hover:bg-[var(--dark-soft)] dark:hover:border-[var(--dark-soft)] dark:hover:text-white`,
          danger: `bg-red-500 text-white border border-red-500 dark:text-white`,
          text: `border-none`
      },
      link: `justify-start border-none`
    },
    table:{
        main: `w-full mt-4 text-left table-auto min-w-max overflow-hidden bg-white`,
        body: {
            td: `h-16 p-3 bg-white transition-all duration-200 group-hover:bg-gray-100 my-10 dark:bg-[var(--dark)] dark:group-hover:bg-[var(--dark-soft)]`
        },
        head:{
            th: `p-3 bg-gray-100 dark:bg-[var(--dark-soft)]`
        }
    },
    container: `max-w-5xl min-h-[70vh] ml-0 lg:ml-[250px] 2xl:mx-auto p-10 px-5 md:px-10 dark:bg-[var(--dark)]`,
    umenu:{
        tag: `border leading-5 px-1.5 text-xs rounded-full`,
        link: `flex items-center gap-2 h-10 px-2.5 group hover:bg-gray-100`,
        row: `flex flex-col p-2 px-0 border-b`,
        label: `uppercase text-xs font-bold m-2`,
        content: `w-[300px] flex flex-col fixed left-3 md:left-[260px] bottom-20 md:bottom-3 z-99 border shadow p-1`
    },
    border: `border-gray-300 dark:border-[var(--dm-line)]`,
    card: `bg-white dark:bg-[var(--dark)]`,
    title: `text-black dark:text-white`,
    hl: `text-gray-600 dark:text-[var(--gray-soft)]`,
    hoverItem: `cursor-pointer hover:bg-gray-200 dark:hover:bg-[var(--dark-soft)] dark:text-[var(--gray)]`,
    avatarCover: `overflow-hidden rounded-full`,
    avatarImg: `object-cover w-full h-full`,
    sidebar: {
        content: `w-[250px] h-screen fixed left-0 top-0 z-40 flex flex-col gap-3 border-r lg:-translate-x-0 transition-all duration-200`
    }
}