import PortfolioPage from '@/components/portfolio/PortfolioPage';

export const revalidate = 60;

export default function Home() {
    return <PortfolioPage lang="en" />;
}
