import { useArticles } from './hooks/useArticles';
import Pagination from './component/Pagination';
import Navbar from './component/Navbar';
import ArticleList from './component/ArticleList';

function App() {
	/**
	 * Destructure the values returned from the useArticles hook
	 */
	const {
		loading,
		articles,
		currentPage,
		setCurrentPage,
		searchArticles,
	} = useArticles();


	/**
	 * Display loading message while articles are being fetched
	 * @returns 
	 */
	const AppLoader = () => (<div className='loading h-screen flex justify-center items-center'>
		<h4 className='text-2xl font-semi-bold'>Fetching Articles...</h4>
	</div>);

	return (
		<div className="bg-primary min-h-screen w-full">
			<Navbar />
			{loading ? (
				<AppLoader />
			) : (
				<div className="flex flex-col items-center mx-32">
					<input
						className="search-input w-full max-w-lg p-2 border-2 border-gray-400 rounded-lg"
						type="text"
						placeholder="Search for articles..."
						onChange={(e) => searchArticles(e.target.value)}
					/>
					<ArticleList articles={articles} />
					{articles.length > 0 && (
						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
