<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlueForge - Minecraft Bedrock</title>
    <!-- Font Awesome untuk Ikon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    
    <style>
        /* Import Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Variabel Warna Tema Biru */
        :root {
            --bg-dark-primary: #0D1117;
            --bg-dark-secondary: #161B22;
            --bg-dark-tertiary: #21262D;
            --border-color: #30363D;
            --text-primary: #E6EDF3;
            --text-secondary: #8B949E;
            --accent-blue: #2F81F7;
            --accent-blue-hover: #1F6FEB;
            --tag-bg: #1A3A69;
        }

        /* Reset & Body Styling */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-dark-primary);
            color: var(--text-primary);
        }

        a {
            color: var(--accent-blue);
            text-decoration: none;
        }

        img {
            max-width: 100%;
            display: block;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        /* Header */
        .main-header {
            background-color: var(--bg-dark-secondary);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header-left { display: flex; align-items: center; gap: 2rem; }
        .logo { font-size: 1.8rem; font-weight: 700; color: var(--accent-blue); }
        .main-nav a { color: var(--text-primary); margin: 0 1rem; font-weight: 500; transition: color 0.2s; }
        .main-nav a:hover { color: var(--accent-blue); }

        .search-bar { flex-grow: 1; margin: 0 2rem; }
        .search-bar input {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: var(--bg-dark-primary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            color: var(--text-primary);
            font-size: 1rem;
        }
        
        .header-right { display: flex; align-items: center; gap: 1rem; }
        .btn { padding: 0.7rem 1.2rem; border-radius: 6px; font-weight: 600; transition: background-color 0.2s; }
        .btn-primary { background-color: var(--accent-blue); color: white; }
        .btn-primary:hover { background-color: var(--accent-blue-hover); }
        
        /* Hero Section */
        .hero-section {
            background: linear-gradient(rgba(13, 17, 23, 0.7), rgba(13, 17, 23, 0.9)), url('https://via.placeholder.com/1600x300.png/0D1117/2F81F7?text=Minecraft+Bedrock') center/cover;
            padding: 4rem 2rem;
            text-align: center;
        }
        .hero-section h1 { font-size: 3rem; font-weight: 700; }

        /* Filter Navigation */
        .filter-nav {
            background-color: var(--bg-dark-secondary);
            border-bottom: 1px solid var(--border-color);
            padding: 0 2rem;
        }
        .filter-nav ul { list-style: none; display: flex; gap: 1.5rem; }
        .filter-nav a {
            display: block;
            padding: 1rem 0.5rem;
            color: var(--text-secondary);
            font-weight: 600;
            border-bottom: 3px solid transparent;
            transition: color 0.2s, border-color 0.2s;
        }
        .filter-nav a:hover { color: var(--text-primary); }
        .filter-nav a.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

        /* Main Content */
        .main-content {
            padding: 2rem 0;
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        /* Mod Card Styling */
        .mod-card {
            background-color: var(--bg-dark-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .mod-card:hover {
            transform: translateY(-4px);
            border-color: var(--accent-blue);
        }

        .card-thumbnail {
            width: 100%;
            height: 160px;
            object-fit: cover;
        }
        
        .card-body {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.25rem;
        }

        .card-author {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        
        .card-tags {
            margin-top: auto;
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .tag {
            background-color: var(--tag-bg);
            color: var(--accent-blue);
            padding: 0.25rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .card-footer {
            border-top: 1px solid var(--border-color);
            padding: 0.75rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
            color: var(--text-secondary);
            background-color: var(--bg-dark-tertiary);
        }

        .card-footer span { display: flex; align-items: center; gap: 0.5rem; }

        /* Footer */
        .main-footer {
            text-align: center;
            padding: 2rem;
            margin-top: 2rem;
            background-color: var(--bg-dark-secondary);
            border-top: 1px solid var(--border-color);
            color: var(--text-secondary);
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header class="main-header">
        <div class="header-left">
            <a href="#" class="logo">BlueForge</a>
            <nav class="main-nav">
                <a href="#">Games</a>
                <a href="#">Mods</a>
                <a href="#">Community</a>
            </nav>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Search for mods, modpacks, and more...">
        </div>
        <div class="header-right">
            <a href="#" class="btn btn-primary">Install BlueForge</a>
            <i class="fa fa-user-circle" style="font-size: 2rem; color: var(--text-secondary);"></i>
        </div>
    </header>
    
    <!-- Main Content -->
    <main>
        <section class="hero-section">
            <h1>Minecraft Bedrock Edition</h1>
        </section>

        <nav class="filter-nav">
            <div class="container">
                <ul>
                    <li><a href="#" class="active">Featured</a></li>
                    <li><a href="#">Popular</a></li>
                    <li><a href="#">Newest</a></li>
                    <li><a href="#">Updated</a></li>
                </ul>
            </div>
        </nav>

        <div class="main-content container">
            <div class="content-grid">
                
                <!-- Card 1 -->
                <div class="mod-card">
                    <img src="https://via.placeholder.com/300x160.png/161B22/FFFFFF?text=World+Gen" alt="Mod Thumbnail" class="card-thumbnail">
                    <div class="card-body">
                        <h3 class="card-title">Expansive Biomes</h3>
                        <p class="card-author">by TheBlueCoder</p>
                        <div class="card-tags">
                            <span class="tag">Worlds</span>
                            <span class="tag">Add-on</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span><i class="fa fa-download"></i> 1.2M</span>
                        <span>Updated: 2 days ago</span>
                    </div>
                </div>
                
                <!-- Card 2 -->
                <div class="mod-card">
                    <img src="https://via.placeholder.com/300x160.png/161B22/FFFFFF?text=Creatures" alt="Mod Thumbnail" class="card-thumbnail">
                    <div class="card-body">
                        <h3 class="card-title">Mythical Creatures</h3>
                        <p class="card-author">by PixelPerfect</p>
                        <div class="card-tags">
                            <span class="tag">Mobs</span>
                            <span class="tag">Add-on</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span><i class="fa fa-download"></i> 850K</span>
                        <span>Updated: 5 days ago</span>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="mod-card">
                    <img src="https://via.placeholder.com/300x160.png/161B22/FFFFFF?text=Technology" alt="Mod Thumbnail" class="card-thumbnail">
                    <div class="card-body">
                        <h3 class="card-title">Simple Machines</h3>
                        <p class="card-author">by LogicCrafters</p>
                        <div class="card-tags">
                            <span class="tag">Technology</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span><i class="fa fa-download"></i> 2.5M</span>
                        <span>Updated: 1 week ago</span>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="mod-card">
                    <img src="https://via.placeholder.com/300x160.png/161B22/FFFFFF?text=UI+Improvement" alt="Mod Thumbnail" class="card-thumbnail">
                    <div class="card-body">
                        <h3 class="card-title">Dark Mode UI Pack</h3>
                        <p class="card-author">by StyleMaster</p>
                        <div class="card-tags">
                            <span class="tag">Texture Packs</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span><i class="fa fa-download"></i> 5.1M</span>
                        <span>Updated: 3 hours ago</span>
                    </div>
                </div>
                
                <!-- Tambahkan lebih banyak card di sini dengan menyalin blok .mod-card -->

            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
        <p>&copy; 2025 BlueForge. Not affiliated with CurseForge or Minecraft.</p>
    </footer>

</body>
</html>
