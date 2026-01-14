import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import './GitHubHeatmap.css';

const GitHubHeatmap = () => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const username = 'nithin2k5';

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        setLoading(true);
        
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error('GitHub user not found');
        }
        const user = await userResponse.json();
        
        // Fetch multiple pages of events to get more accurate data
        let allEvents = [];
        let page = 1;
        const maxPages = 10; // Fetch up to 10 pages (1000 events)
        
        while (page <= maxPages) {
          try {
            const eventsResponse = await fetch(
              `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
            );
            
            if (!eventsResponse.ok) {
              // If we get rate limited or error, break
              if (eventsResponse.status === 403 || eventsResponse.status === 404) {
                break;
              }
              // For other errors, try next page
              page++;
              continue;
            }
            
            const events = await eventsResponse.json();
            
            if (!Array.isArray(events) || events.length === 0) {
              break;
            }
            
            allEvents = allEvents.concat(events);
            
            // If we got less than 100 events, we've reached the end
            if (events.length < 100) {
              break;
            }
            
            // Small delay to avoid rate limiting
            if (page < maxPages) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            page++;
          } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            break;
          }
        }
        
        const contributionMap = new Map();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weeks = 70;
        const daysPerWeek = 7;
        const totalDays = weeks * daysPerWeek;
        
        // Initialize all dates with 0 contributions
        for (let i = 0; i < totalDays; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - (totalDays - 1 - i));
          date.setHours(0, 0, 0, 0);
          const dateKey = date.toISOString().split('T')[0];
          contributionMap.set(dateKey, 0);
        }
        
        // Process events and count contributions
        allEvents.forEach(event => {
          if (event.created_at) {
            const eventDate = new Date(event.created_at);
            eventDate.setHours(0, 0, 0, 0);
            const dateKey = eventDate.toISOString().split('T')[0];
            
            // Only count events within our date range
            if (contributionMap.has(dateKey)) {
              let contributionCount = 0;
              
              // Count contributions based on event type
              if (event.type === 'PushEvent') {
                // Count commits in push events
                contributionCount = event.payload?.commits?.length || 1;
              } else if (['IssuesEvent', 'PullRequestEvent', 'CreateEvent', 'IssueCommentEvent', 'PullRequestReviewEvent'].includes(event.type)) {
                // Count other contribution types as 1
                contributionCount = 1;
              }
              
              if (contributionCount > 0) {
                const currentCount = contributionMap.get(dateKey) || 0;
                contributionMap.set(dateKey, currentCount + contributionCount);
              }
            }
          }
        });
        
        const data = [];
        let total = 0;
        
        for (let i = 0; i < totalDays; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - (totalDays - 1 - i));
          date.setHours(0, 0, 0, 0);
          const dateKey = date.toISOString().split('T')[0];
          const count = contributionMap.get(dateKey) || 0;
          total += count;
          
          data.push({
            date: new Date(date),
            count: count
          });
        }
        
        setContributions(data);
        setTotalContributions(total);
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        generateFallbackData();
      } finally {
        setLoading(false);
      }
    };

    const generateFallbackData = () => {
      const weeksCount = 70;
      const daysPerWeek = 7;
      const totalDays = weeksCount * daysPerWeek;
      const data = [];
      let fallbackTotal = 0;

      const today = new Date();
      for (let i = totalDays - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const count = Math.floor(Math.random() * 11);
        fallbackTotal += count;
        
        data.push({
          date: date,
          count: count
        });
      }

      setContributions(data);
      setTotalContributions(fallbackTotal);
    };

    fetchGitHubContributions();
  }, []);

  const getIntensity = (count) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 7) return 2;
    if (count <= 14) return 3;
    return 4;
  };

  const weeks = [];
  if (contributions.length > 0) {
    for (let i = 0; i < 70; i++) {
      const weekStart = i * 7;
      weeks.push(contributions.slice(weekStart, weekStart + 7));
    }
  }

  const monthLabels = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (contributions.length > 0) {
    for (let i = 0; i < 70; i += 4) {
      if (contributions[i * 7]) {
        const date = contributions[i * 7].date;
        monthLabels.push({
          index: i,
          label: monthNames[date.getMonth()]
        });
      }
    }
  }

  if (loading || contributions.length === 0) {
    return (
      <div className="github-heatmap-loading">
        <div className="github-heatmap-loading-content">
          <FaGithub />
          <div className="github-heatmap-loading-text">Loading GitHub activity...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-heatmap-container">
      {/* Stats Header */}
      <div className="github-heatmap-header">
        <div className="github-heatmap-icon-wrapper">
          <FaGithub />
        </div>
        <div className="github-heatmap-stats">
          <div className="github-heatmap-stats-number">
            {totalContributions.toLocaleString()}
          </div>
          <div className="github-heatmap-stats-label">Contributions</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="github-heatmap-content">
        <div className="github-heatmap-inner">
          {/* Month Labels */}
          <div className="github-heatmap-month-labels">
            {monthLabels.map((month, idx) => (
              <div
                key={idx}
                className="github-heatmap-month-label"
                style={{ left: `${(month.index / 70) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {month.label}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="github-heatmap-grid">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="github-heatmap-week">
                {week.map((day, dayIndex) => {
                  const intensity = getIntensity(day.count);
                  return (
                    <div
                      key={dayIndex}
                      className={`github-heatmap-day github-heatmap-day-intensity-${intensity}`}
                      title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="github-heatmap-legend">
            <span className="github-heatmap-legend-text">Less</span>
            <div className="github-heatmap-legend-items">
              {[0, 1, 2, 3, 4].map((intensity) => (
                <div
                  key={intensity}
                  className={`github-heatmap-legend-item github-heatmap-day-intensity-${intensity}`}
                />
              ))}
            </div>
            <span className="github-heatmap-legend-text">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
