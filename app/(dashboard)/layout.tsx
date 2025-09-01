export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add navigation header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Polling App</h1>
            <nav className="flex items-center space-x-4">
              {/* TODO: Add navigation links */}
              <span className="text-muted-foreground">Navigation will be implemented here</span>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
