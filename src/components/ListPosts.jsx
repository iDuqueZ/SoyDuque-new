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


    const changeFilter = (e) => {

        history.replaceState(null, '', `?filter=${e.target.value}`);

        setFilterBy(e.target.value);
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

    return (
        <>
            <section className='flex gap-6 items-center mb-6'>
                <div className='filterPost'>
                    <select
                        name='filter'
                        id='filter'
                        className='filter-select p-2 border-b-2 border-zinc-400 text-zinc-600 accent-teal-500 outline-none text-lg bg-transparent'
                        onChange={changeFilter}
                    >
                        <option value='all'>Todos</option>
                        <option value='Personal'>Personal</option>
                        <option value='Work'>Trabajo</option>
                        <option value='Studies'>Estudios</option>
                        <option value='StoryTime'>Story Time</option>
                    </select>
                </div>
                <div className='flex w-full relative'>
                    <input
                        id='searchBar'
                        name='search'
                        className='w-full p-2 outline-none border-b-2 border-zinc-400 text-zinc-600 text-lg bg-transparent'
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
