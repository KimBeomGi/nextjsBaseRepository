export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">NextShop</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              가장 진보된 Next.js 기술로 만들어진<br />
              궁극의 이커머스 레퍼런스.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">New Arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Best Sellers</a></li>
              <li><a href="#" className="hover:text-foreground">Sale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About Us</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 NextShop Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
