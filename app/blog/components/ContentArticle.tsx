'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


type Props = {
    content: string;
}

export function ContentArticle({ content }: Props) {

    return (
        <div className='prose dark:prose-invert prose-lg max-w-3xl mx-auto'>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
    )

}