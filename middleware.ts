import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper function to check if a string contains Chinese characters
function containsChineseCharacters(text: string): boolean {
  return /[\u4E00-\u9FFF]/.test(text);
}

export function middleware(request: NextRequest) {
  // Current language from cookie if exists
  const currentLang = request.cookies.get('selectedLanguage')?.value;
  
  // If language is already set, no need to detect
  if (currentLang) {
    return NextResponse.next();
  }
  
  let detectedLang = 'en'; // Default language
  
  // Check URL search parameters for Chinese queries
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || searchParams.get('query') || searchParams.get('search');
  
  if (query && containsChineseCharacters(query)) {
    detectedLang = 'zh';
  } else {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      // Parse the Accept-Language header
      // Example: "zh-CN,zh;q=0.9,en;q=0.8"
      const languages = acceptLanguage.split(',').map(lang => {
        const [language, weight] = lang.trim().split(';');
        return { language: language.split('-')[0], weight: weight ? parseFloat(weight.split('=')[1]) : 1 };
      });
      
      // Sort by weight (highest first)
      languages.sort((a, b) => b.weight - a.weight);
      
      // Check if Chinese is the preferred language
      if (languages.length > 0 && languages[0].language === 'zh') {
        detectedLang = 'zh';
      }
    }
    
    // Check referer for Chinese search engines
    const referer = request.headers.get('referer');
    if (referer) {
      const chineseSearchEngines = [
        'baidu.com',
        'sogou.com',
        'so.com',
        'sm.cn',
        'haosou.com',
        'youdao.com',
        'bing.com/search?q=',  // Bing with Chinese query
      ];
      
      if (chineseSearchEngines.some(engine => referer.includes(engine) && referer.match(/[\u4E00-\u9FFF]/))) {
        detectedLang = 'zh';
      }
    }
  }
  
  // Set the language cookie for future requests
  const response = NextResponse.next();
  response.cookies.set('selectedLanguage', detectedLang, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};