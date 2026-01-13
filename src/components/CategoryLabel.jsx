import './CategoryLabel.css';

export function CategoryLabel({ category }) {
  return (
    <div className='category-label-wrapper'>
      <div className="category-label">
        {category ? `CATEGORY: ${category}` : 'ARCHIVE'}
      </div>
      <div className='blank'></div>
    </div>
  );
}