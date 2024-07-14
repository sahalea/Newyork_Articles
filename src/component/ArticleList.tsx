/**
 * Interface for Article object
 */
interface Article {
	id: number;
	title: string;
	abstract: string;
	published_date: string;
	section: string;
	media: {
		[key: string]: {
			[key: string]: {
				url: string;
				format: string;
			}[];
		};
	};
}

/**
 * Props interface for ArticleList
 */
interface ArticleListProps {
	articles: any[];
}

/**
 * Article list component
 * 
 * @param param0 
 * @returns 
 */
const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {

	/**
	 * Function for retrive thumbnail image from the media-metadata array
	 * 
	 * @param param0 
	 * @returns 
	 */
	const RenderImage = ({ files }: any) => {
		if (!files && !files.length) return null;
		const imageDetails = files?.[0]?.['media-metadata']?.filter(
			(file: any) => file.format === 'mediumThreeByTwo210'
		);
		// if no image found return dummy image
		const ImageURl = imageDetails?.length ? imageDetails[0].url : "https://dummyimage.com/600x400/000/fff";
		
		return <img src={ImageURl}  className="w-1/3 rounded-2xl border-2" alt={ImageURl} />
	};

	/**
	 * Render article of each card
	 * 
	 * @param param0 
	 * @returns 
	 */
	const ArticleCard = ({ article }: { article: Article }) => (
		<div key={article.id} className="w-full max-w-xl bg-white flex p-2 rounded-2xl border border-gray-200 rounded-lg shadow">
			<RenderImage files={article.media} />
			<div className="content ml-4">
				<span className="h-3/4 block flex-1">
					<h4 className="text-md  font-bold">{article.title}</h4>
					<p className="text-sm text-textColor">{article.abstract}</p>
				</span>
				<span className="block flex justify-between mt-2">
					<p className="text-xs font-bold">{article.published_date}</p>
					<p className="text-xs bg-gray-400 px-2 py-1 rounded-md text-white uppercase">{article.section}</p>
				</span>
			</div>
		</div>
	);

	return (
		<div className="my-4 gap-2 flex flex-wrap article-list-item" data-testid="article-list ">
			{articles.map((article: Article, index: number) => (
				<ArticleCard key={index} article={article} />
			))}
		</div>
	);
};

export default ArticleList;
