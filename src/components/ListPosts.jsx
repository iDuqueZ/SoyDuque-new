import React, { useEffect, useState } from 'react';
import CardItem from './CardItem.jsx';

const ListPosts = ({ postList }) => {
    const [dataPost, setDataPost] = useState(postList.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate)));

    //Ordenar por fecha
    useEffect(() => {
        setDataPost(postList.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate)));
    }, [postList]);



    const [filterBy, setFilterBy] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const filter = searchParams.get('filter');
        return filter || 'all';
    });


    const [searchPost, setSearchPost] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    const changeFilter = (tag) => {
        history.replaceState(null, '', `?filter=${tag}`);
        setFilterBy(tag);
        toggleDropdown();
    };


    const lowerCaseSearch = searchPost.toLowerCase();
    const filteredPosts = dataPost.filter(post => {
        const titleIncludesSearch = post.frontmatter.title.toLowerCase().includes(lowerCaseSearch);
        if (filterBy === 'all') {
            return titleIncludesSearch;
        } else {
            return post.frontmatter.tags.includes(filterBy) && titleIncludesSearch;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (tag) => {
        changeFilter(tag);
        toggleDropdown();
    };


    return (
        <>
            <section className='flex md:flex-row flex-col-reverse gap-2 md:gap-6 items-center mb-6'>
                <div className='filterPost w-full md:w-auto'>
                    <div className="relative">
                        <button
                            className="w-full justify-between text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                            type="button"
                            onClick={toggleDropdown}
                        >
                            {filterBy === 'all' ? 'Todos' : filterBy}
                            <svg
                                className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div
                                id="dropdownHover"
                                className="z-10 absolute top-full rounded-lg shadow md:w-44 w-full dark:bg-zinc-700"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                    <li className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
                                        <button onClick={() => changeFilter('all')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Todos</button>
                                    </li>
                                    {[...new Set(postList.flatMap((post) => post.frontmatter.tags))].map((tag, index) => (
                                        <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <button
                                                onClick={() => changeFilter(tag)}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                {tag}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
                <div className='flex w-full relative'>
                    <input
                        id='searchBar'
                        name='search'
                        className='w-full p-2 outline-none border-b-2 border-zinc-400 text-zinc-200 text-lg bg-transparent'
                        type='search'
                        placeholder='Buscar Por Titulo...'
                        onChange={(e) => setSearchPost(e.target.value)}
                    />
                    <div className='search-icon text-xl align-text-bottom p-2 absolute right-0'>🔎</div>
                </div>
            </section>

            <section>
                <ul className="grid md:grid-cols-1 gap-4">
                    {currentItems.map((post, index) => (
                        <CardItem
                            key={index}
                            url={post.url}
                            imageUrl={post.frontmatter.image.url}
                            title={post.frontmatter.title}
                            date={post.frontmatter.pubDate}
                            description={post.frontmatter.description}
                            autor={post.frontmatter.author}
                            tags={post.frontmatter.tags}
                        />
                    ))}
                </ul>
                <div className={`pagination flex mx-auto w-fit mt-6 shadow-md text-zinc-600 text-sm ${filteredPosts.length < 12 ? 'hidden' : 'flex'}`}>
                    {/* Boton anterior */}
                    <button
                        className='bg-white outline-none border-1 p-2 rounded-l-md border-[1px] border-zinc-500'
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        {/* flecha izquierda */}
                        <svg className='w-4 h-4 text-zinc-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                        <div className=''>
                            <button
                                className={`bg-white outline-none border-[1px] border-l-0 p-2 border-zinc-500 text-wrap w-10 ${currentPage === pageNumber ? 'bg-teal-50 text-teal-600 font-medium' : 'text-zinc-600'}`}
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}>
                                {pageNumber}
                            </button>
                        </div>
                    ))}

                    {/* Boton siguiente */}
                    <button
                        className='bg-white outline-none border-1 p-2 rounded-r-md border-[1px] border-l-0 border-zinc-500'
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        {/* flecha derecha */}
                        <svg className='w-4 h-4 text-zinc-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
};

export default ListPosts;
